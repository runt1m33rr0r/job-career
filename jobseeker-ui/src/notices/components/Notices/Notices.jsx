import React from "react";
import PropTypes from "prop-types";
import ApprovalNotice from "../ApprovalNotice";
import ApplicationNotice from "../ApplicationNotice";
import EditNotice from "../EditNotice";
import NoticeListItem from "../NoticeListItem";
import ItemsList from "../../../shared/components/ItemsList";
import { userTypes } from "../../../shared/constants";

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

function Notices({ userType }) {
  let noticeElement = ApplicationNotice;
  if (userType === userTypes.ADMIN) {
    noticeElement = ApprovalNotice;
  } else if (userType === userTypes.COMPANY) {
    noticeElement = EditNotice;
  }

  return (
    <ItemsList
      items={notices}
      popupElement={noticeElement}
      listItemElement={NoticeListItem}
    />
  );
}

Notices.propTypes = {
  userType: PropTypes.string.isRequired
};

export default Notices;
