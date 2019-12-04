function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function getCompanyNotices({ company }) {
  console.log({ company });

  await sleep(1000);

  return {
    success: true,
    message: "Notices gathered successfully!",
    notices: [
      {
        id: 1,
        title: "some title1",
        category: "category1",
        company: "company",
        content: "content1",
        closed: false,
        approved: false,
        lastModified: "some date1"
      },
      {
        id: 2,
        title: "some title2",
        category: "category2",
        company: "company",
        content: "content2",
        closed: false,
        approved: false,
        lastModified: "some date2"
      }
    ]
  };
}

export async function createNotice({ title, category, content, companyName }) {
  console.log({ title, category, content, companyName });

  await sleep(1000);

  return {
    success: true,
    message: "Notice created successfully!"
  };
}

export async function editNotice({
  id,
  category,
  title,
  content,
  closed,
  approved
}) {
  console.log({ id, category, title, content, closed, approved });

  await sleep(1000);

  return {
    success: true,
    message: "Notice edited successfully!"
  };
}

export async function deleteNotice({ id }) {
  console.log({ id });

  await sleep(1000);

  return {
    success: true,
    message: "Notice deleted successfully!"
  };
}
