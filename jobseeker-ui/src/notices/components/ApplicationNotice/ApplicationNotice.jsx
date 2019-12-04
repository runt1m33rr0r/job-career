import React from "react";
import BaseNoticeModal from "../BaseNoticeModal";
import Button from "../NoticeModalButton";

const ApplicationNotice = props => (
  <BaseNoticeModal readOnly={true} {...props}>
    <Button text="Apply" />
  </BaseNoticeModal>
);

export default ApplicationNotice;
