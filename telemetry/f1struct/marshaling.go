package f1struct

import (
	"bytes"
	"encoding/binary"
	"fmt"
	"io"
	"reflect"
	"strconv"
	"strings"
)

func Marshal(value any) ([]byte, error) {
	var buffer bytes.Buffer

	v := reflect.Indirect(reflect.ValueOf(value))
	if v.Kind() != reflect.Struct {
		return nil, fmt.Errorf("expected struct: %s", v.Kind())
	}

	for i := 0; i < v.NumField(); i++ {
		field := v.Field(i)
		// TODO: binary.Read uses a fast path for known simple types, use it here for speed?
		switch field.Kind() {
		case reflect.Bool, reflect.Uint8, reflect.Int8, reflect.Uint16, reflect.Int16, reflect.Float32, reflect.Uint32, reflect.Uint64:
			binary.Write(&buffer, binary.LittleEndian, field.Interface())
		case reflect.String:
			fieldType := v.Type().Field(i)
			lengthString := fieldType.Tag.Get("length")
			if lengthString == "" {
				return nil, fmt.Errorf("missing required length tag for string field")
			}

			length, err := strconv.ParseInt(lengthString, 10, 32)
			if err != nil {
				return nil, err
			}

			value := field.String()

			if len(value) > int(length) {
				return nil, fmt.Errorf("string value is longer than what's permitted")
			}

			binary.Write(&buffer, binary.LittleEndian, []byte(value))

			for j := 0; j < int(length)-len(value); j++ {
				buffer.WriteByte(0)
			}
		case reflect.Struct:
			part, err := Marshal(field.Interface())
			if err != nil {
				return nil, err
			}
			buffer.Write(part)
		case reflect.Array:
			if field.Type().Elem().Kind() == reflect.Uint8 {
				v := field.Addr().Elem()
				slice := v.Slice(0, v.Len())
				buffer.Write(slice.Bytes())
			} else {
				length := field.Len()
				for j := 0; j < length; j++ {
					part, err := Marshal(field.Index(j).Interface())
					if err != nil {
						return nil, err
					}
					buffer.Write(part)
				}
			}
		case reflect.Slice:
			length := field.Len()
			binary.Write(&buffer, binary.LittleEndian, uint8(length))
			for j := 0; j < length; j++ {
				part, err := Marshal(field.Index(j).Interface())
				if err != nil {
					return nil, err
				}
				buffer.Write(part)
			}
		default:
			return nil, fmt.Errorf("cannot marshal unsupported field: %s (%s)", field.Type(), field.Type().Name())
		}
	}

	return buffer.Bytes(), nil
}

func Unmarshal(data any, value any) error {
	var reader io.Reader
	if r, ok := data.(io.Reader); ok {
		reader = r
	} else if b, ok := data.([]byte); ok {
		reader = bytes.NewReader(b)
	} else {
		return fmt.Errorf("expected byte array or io.Reader")
	}

	v := reflect.Indirect(reflect.ValueOf(value))
	if v.Kind() != reflect.Struct {
		return fmt.Errorf("expected struct")
	}

	for i := 0; i < v.NumField(); i++ {
		field := v.Field(i)
		if field.CanSet() {
			// TODO: binary.Read uses a fast path for known simple types, use it here for speed?
			switch field.Kind() {
			case reflect.Bool, reflect.Uint8, reflect.Int8, reflect.Uint16, reflect.Int16, reflect.Float32, reflect.Uint32, reflect.Uint64:
				if err := binary.Read(reader, binary.LittleEndian, field.Addr().Interface()); err != nil {
					return err
				}
			case reflect.String:
				fieldType := v.Type().Field(i)
				lengthString := fieldType.Tag.Get("length")
				if lengthString == "" {
					return fmt.Errorf("missing required length tag for string field")
				}

				length, err := strconv.ParseInt(lengthString, 10, 32)
				if err != nil {
					return err
				}

				value, err := io.ReadAll(io.LimitReader(reader, length))
				if err != nil {
					return err
				}

				stringValue := string(value)
				stringValue, _, _ = strings.Cut(stringValue, "\u0000")

				field.SetString(stringValue)
			case reflect.Struct:
				fieldType := v.Type().Field(i)
				nestedString := fieldType.Tag.Get("nested")
				if nestedString == "" {
					nestedString = "false"
				}

				nested, err := strconv.ParseBool(nestedString)
				if err != nil {
					return err
				}

				if nested {
					if err := Unmarshal(reader, field.Addr().Interface()); err != nil {
						return err
					}
				}
			case reflect.Array:
				if field.Type().Elem().Kind() == reflect.Uint8 {
					v := field.Addr().Elem()
					slice := v.Slice(0, v.Len())
					if _, err := reader.Read(slice.Bytes()); err != nil {
						return err
					}
				} else {
					for j := 0; j < field.Len(); j++ {
						value := field.Index(j)
						if err := Unmarshal(reader, value.Addr().Interface()); err != nil {
							return err
						}
					}
				}
			case reflect.Slice:
				var length uint8
				if err := binary.Read(reader, binary.LittleEndian, &length); err != nil {
					return err
				}

				slice := reflect.MakeSlice(field.Type(), int(length), int(length))
				for j := 0; j < int(length); j++ {
					value := slice.Index(j)
					if err := Unmarshal(reader, value.Addr().Interface()); err != nil {
						return err
					}
				}
				field.Set(slice)
			default:
				return fmt.Errorf("cannot unmarshal unsupported field: %s, %s", field.Type(), field.Type().Name())
			}
		}
	}

	return nil
}
