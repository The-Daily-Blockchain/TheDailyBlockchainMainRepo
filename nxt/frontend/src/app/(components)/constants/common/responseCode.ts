enum EAPIErrorCodeI18n {
  G0001 = "G0001",
  G0002 = "G0002",
  G0003 = "G0003",
  G0004 = "G0004",
  G0005 = "G0005",
  I0008 = "I0008",
  MemberDateOfBirthInvalid = "member.dateofbirth-invalid",
}

const APIErrorCodeI18n = {
  [EAPIErrorCodeI18n.G0001]: "ErrIsInvalid",
  [EAPIErrorCodeI18n.G0002]: "ErrBadRequest",
  [EAPIErrorCodeI18n.G0003]: "ErrUnauthorized",
  [EAPIErrorCodeI18n.G0004]: "ErrPermissionDenied",
};

export const refreshTokenMessErr = [
  "unable to refresh jwt token",
  'strconv.ParseFloat: parsing "e": invalid syntax',
  "unexpected end of JSON input",
  "session not found",
  "runtime error: invalid memory address or nil pointer dereference",
  "Token has expired or is invalid",
];

export { APIErrorCodeI18n, EAPIErrorCodeI18n };
