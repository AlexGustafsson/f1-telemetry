package f12021

type TractionControl uint8

const (
	TractionControlOff TractionControl = iota
	TractionControlMedium
	TractionControlFull
)

type FuelMix uint8

const (
	FuelMixLean FuelMix = iota
	FuelMixStandard
	FuelMixRich
	FuelMixMax
)

type VehicleFIAFlag int8

const (
	VehicleFIAFlagUnknown VehicleFIAFlag = iota - 1
	VehicleFIAFlagNone
	VehicleFIAFlagGreen
	VehicleFIAFlagBlue
	VehicleFIAFlagYellow
	VehicleFIAFlagRed
)

type ERSDeployMode uint8

const (
	ERSDeployModeNone ERSDeployMode = iota
	ERSDeployModeMedium
	ERSDeployModeHotlap
	ERSDeployModeOvertake
)

type PacketCarStatus struct {
	PacketHeader `nested:"true"`

	Cars [22]struct {
		TractionControl         TractionControl
		AntiLockBrakes          bool
		FuelMix                 FuelMix
		FrontBrakeBias          uint8
		PitLimiter              bool
		FuelInTank              float32
		FuelCapacity            float32
		FuelRemainingLaps       float32
		MaxRPM                  uint16
		IdleRPM                 uint16
		MaxGears                uint8
		DRSAllowed              bool
		DRSActivationDistance   uint16
		TyreActualCompound      TyreCompound
		TyreVisualCompound      VisualTyreCompound
		TyresAgeLaps            uint8
		VehicleFIAFlag          VehicleFIAFlag
		ERSStoreEnergy          float32
		ERSDeployMode           ERSDeployMode
		ERSHarvestedThisLapMGUK float32
		ERSHarvestedThisLapMGUH float32
		ERSDeployedThisLap      float32
		NetworkPaused           bool
	}
}
