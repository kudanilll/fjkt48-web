type ErrorStatus = {
  errorCode: 401 | 403 | 404;
};

export function getErrorMessage(status: ErrorStatus) {
  const error: string | undefined = {
    401: "",
    403: "",
    404: "404 - Halaman Tidak Ditemukan",
  }[status.errorCode];

  const desc: string | undefined = {
    401: "",
    403: "",
    404: "Halaman yang anda cari tidak ada",
  }[status.errorCode];

  return {
    error,
    desc,
  };
}
