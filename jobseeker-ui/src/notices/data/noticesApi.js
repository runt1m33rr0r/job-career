function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function createNotice({ title, category, content, companyName }) {
  console.log({ title, category, content, companyName });

  await sleep(1000);

  return {
    success: true,
    message: "Notice created successfully!"
  };
}
