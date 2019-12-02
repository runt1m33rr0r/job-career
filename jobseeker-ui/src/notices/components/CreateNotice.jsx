import React from "react";
import BaseNoticeModal from "./BaseNoticeModal";
import Button from "./NoticeModalButton";

const CreateNotice = props => (
  <BaseNoticeModal readOnly={false} {...props}>
    <Button text="Publish" />
  </BaseNoticeModal>
);

export default CreateNotice;
