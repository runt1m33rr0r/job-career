function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function register({
  type,
  firstName,
  lastName,
  companyName,
  eMail,
  password
}) {
  console.log({ type, firstName, lastName, companyName, eMail, password });

  await sleep(1000);

  return {
    success: true,
    message: "Registration successful!",
    token: "123456"
  };
}

export async function login({ type, eMail, password }) {
  console.log({ type, eMail, password });

  await sleep(1000);

  return {
    success: true,
    message: "Login successful!",
    token: "123456"
  };
}

export async function changeProfile({
  firstName,
  lastName,
  companyName,
  phoneNumber,
  eMail,
  password
}) {
  console.log({
    firstName,
    lastName,
    companyName,
    phoneNumber,
    eMail,
    password
  });

  await sleep(1000);

  return {
    success: true,
    message: "Profile change successful!",
    token: "123456"
  };
}
