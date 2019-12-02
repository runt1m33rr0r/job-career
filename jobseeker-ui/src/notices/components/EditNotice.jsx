import React from "react";
import BaseNoticeModal from "./BaseNoticeModal";
import Button from "./NoticeModalButton";

const EditNotice = props => (
  <BaseNoticeModal readOnly={false} {...props}>
    <Button text="Update" />
    <Button text="Delete" />
    <Button text="Open" />
    <Button text="Close" />
  </BaseNoticeModal>
);

export default EditNotice;
