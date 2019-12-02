import React from "react";
import NoticeModal from "./NoticeModal";
import NoticeListItem from "./NoticeListItem";
import ItemsList from "../../shared/components/ItemsList";

const notices = [
  {
    id: 1,
    title: "some title",
    category: "category1",
    company: "some company",
    content: "# test",
    closed: false,
    approved: false,
    lastModified: "some date"
  },
  {
    id: 2,
    title: "some title",
    category: "category1",
    company: "some company",
    content: "# test",
    closed: false,
    approved: false,
    lastModified: "some date"
  },
  {
    id: 3,
    title: "some title",
    category: "category1",
    company: "some company",
    content: "# test",
    closed: false,
    approved: false,
    lastModified: "some date"
  }
];

const Notices = () => (
  <ItemsList
    items={notices}
    popupElement={<NoticeModal />}
    listItemElement={NoticeListItem}
  />
);

export default Notices;
