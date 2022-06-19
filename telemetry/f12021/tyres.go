package f12021

//go:generate stringer -type=TyreCompound
type TyreCompound uint8

const (
	TyreCompoundFormula1ModernC5    TyreCompound = 16
	TyreCompoundFormula1ModernC4    TyreCompound = 17
	TyreCompoundFormula1ModernC3    TyreCompound = 18
	TyreCompoundFormula1ModernC2    TyreCompound = 19
	TyreCompoundFormula1ModernC1    TyreCompound = 20
	TyreCompoundFormula1ModernInter TyreCompound = 7
	TyreCompoundFormula1ModernWet   TyreCompound = 8
)

const (
	TyreCompoundFormula1ClassicDry TyreCompound = 9
	TyreCompoundFormula1ClassicWet TyreCompound = 10
)

const (
	TyreCompoundFormula2SuperSoft TyreCompound = 11
	TyreCompoundFormula2Soft      TyreCompound = 12
	TyreCompoundFormula2Medium    TyreCompound = 13
	TyreCompoundFormula2Hard      TyreCompound = 14
	TyreCompoundFormula2Wet       TyreCompound = 15
)

//go:generate stringer -type=VisualTyreCompound
type VisualTyreCompound uint8

const (
	VisualTyreCompoundFormula1ModernSoft   VisualTyreCompound = 16
	VisualTyreCompoundFormula1ModernMedium VisualTyreCompound = 17
	VisualTyreCompoundFormula1ModernHard   VisualTyreCompound = 18
	VisualTyreCompoundFormula1ModernInter  VisualTyreCompound = 7
	VisualTyreCompoundFormula1ModernWet    VisualTyreCompound = 8
)

const (
	VisualTyreCompoundFormula1ClassicSoft   VisualTyreCompound = 16
	VisualTyreCompoundFormula1ClassicMedium VisualTyreCompound = 17
	VisualTyreCompoundFormula1ClassicHard   VisualTyreCompound = 18
	VisualTyreCompoundFormula1ClassicInter  VisualTyreCompound = 7
	VisualTyreCompoundFormula1ClassicWet    VisualTyreCompound = 8
)

const (
	VisualTyreCompoundFormula2Wet       VisualTyreCompound = 15
	VisualTyreCompoundFormula2SuperSoft VisualTyreCompound = 19
	VisualTyreCompoundFormula2Soft      VisualTyreCompound = 20
	VisualTyreCompoundFormula2Medium    VisualTyreCompound = 21
	VisualTyreCompoundFormula2Hard      VisualTyreCompound = 22
)
