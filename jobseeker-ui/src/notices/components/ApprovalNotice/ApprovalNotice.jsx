import React from "react";
import PropTypes from "prop-types";
import BaseNoticeModal from "../BaseNoticeModal";
import Button from "../NoticeModalButton";

function ApprovalNotice(props) {
  const makeApprovalRequest = approved =>
    props.editNoticeRequest({
      id: props.notice.id,
      closed: props.notice.closed,
      category: props.notice.category,
      title: props.notice.title,
      content: props.notice.content,
      approved
    });

  const onApproved = () => makeApprovalRequest(true);
  const onDisapproved = () => makeApprovalRequest(false);

  return (
    <BaseNoticeModal readOnly={true} {...props}>
      <Button
        text="Approve"
        onClick={onApproved}
        disabled={props.isFetching || props.notice.approved}
      />
      <Button
        text="Disapprove"
        onClick={onDisapproved}
        disabled={props.isFetching || !props.notice.approved}
      />
    </BaseNoticeModal>
  );
}

ApprovalNotice.propTypes = {
  editNoticeRequest: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired
};

export default ApprovalNotice;
