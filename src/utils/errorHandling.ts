export const handlingAxioxError = (status: number | undefined) => {
  if (status === 404) {
    return { message: "The board was not found", statusCode: 404 };
  } else if (status == 500) {
    return {
      message: "Server error. Please try again later.",
      statusCode: 500,
    };
  }
};
