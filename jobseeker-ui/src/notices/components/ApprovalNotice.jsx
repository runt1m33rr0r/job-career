import React from "react";
import BaseNoticeModal from "./BaseNoticeModal";
import Button from "./NoticeModalButton";

const ApprovalNotice = props => (
  <BaseNoticeModal readOnly={true} {...props}>
    <Button text="Approve" />
    <Button text="Disapprove" />
  </BaseNoticeModal>
);

export default ApprovalNotice;
