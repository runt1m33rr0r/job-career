import React from "react";
import ApplicationEditor from "./ApplicationEditor";
import ItemsList from "./ItemsList";
import ApplicationListItem from "./ApplicationListItem";

const applications = [
  {
    id: 1,
    phone: "some phone",
    eMail: "some mail",
    letter: "some letter",
    firstName: "first name",
    lastName: "last name",
    lastModified: "some date",
    notice: {
      id: 1,
      title: "some title",
      category: "some category",
      company: "some company",
      content: "some content",
      closed: false,
      lastModified: "some date"
    }
  },
  {
    id: 2,
    phone: "some phone",
    eMail: "some mail",
    letter: "some letter",
    firstName: "first name",
    lastName: "last name",
    lastModified: "some date",
    notice: {
      id: 1,
      title: "some title",
      category: "some category",
      company: "some company",
      content: "some content",
      closed: false,
      lastModified: "some date"
    }
  }
];

const Applications = () => (
  <ItemsList
    items={applications}
    editorElement={ApplicationEditor}
    listItemElement={ApplicationListItem}
  />
);

export default Applications;
