const applications = [
  {
    id: 1,
    authorId: 1,
    phone: "some phone",
    email: "some mail",
    letter: "some letter",
    firstName: "first name",
    lastName: "last name",
    lastModified: "some date",
    notice: {
      id: 1,
      title: "some title",
      category: "category1",
      company: "some company",
      content: "some content",
      closed: false,
      lastModified: "some date"
    }
  },
  {
    id: 2,
    authorId: 2,
    phone: "some phone",
    email: "some mail",
    letter: "some letter",
    firstName: "first name",
    lastName: "last name",
    lastModified: "some date",
    notice: {
      id: 2,
      title: "some title2",
      category: "category2",
      company: "some company",
      content: "some content",
      closed: false,
      lastModified: "some date"
    }
  }
];

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function getApplications({ authorId, company }) {
  console.log({ authorId, company });

  await sleep(1000);

  return {
    success: true,
    message: "Applications gathered successfully!",
    applications
  };
}

export async function editApplication({ id, phone, email, letter }) {
  console.log({ id, phone, email, letter });

  await sleep(1000);

  return {
    success: true,
    message: "Application eddited successfully!"
  };
}

export async function createApplication({
  candidateId,
  noticeId,
  phone,
  email,
  letter
}) {
  console.log({ candidateId, noticeId, phone, email, letter });

  return getApplications({ email });
}

export async function deleteApplication({ id }) {
  console.log(id);

  await sleep(1000);

  return {
    success: true,
    message: "Application deleted successfully!"
  };
}
