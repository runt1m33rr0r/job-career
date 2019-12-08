import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import BaseNoticeModal from "../BaseNoticeModal";
import Button from "../NoticeModalButton";
import ApplicationModal from "../../../applications/components/ApplicationModal";
import { userTypes } from "../../../shared/constants";

function NoticeModal(props) {
  const isApplicationNotice =
    !props.viewNotice && props.userType === userTypes.USER;
  const isApprovalNotice = props.userType === userTypes.ADMIN;
  const isCreationNotice =
    props.userType === userTypes.COMPANY && props.creationNotice;
  const isEditNotice =
    props.userType === userTypes.COMPANY &&
    props.notice.company === props.companyName;

  const [title, setTitle] = useState(isEditNotice ? props.notice.title : "");
  const [isApplicationOpen, setIsApplicationOpen] = useState(false);
  const [category, setCategory] = useState(
    !isEditNotice && props.categories[0]
      ? props.categories[0].name
      : props.notice.category
  );
  const [content, setDescription] = useState(
    isEditNotice ? props.notice.content : ""
  );

  useEffect(() => {
    if (isEditNotice) {
      setCategory(props.notice.category);
      setTitle(props.notice.title);
      setDescription(props.notice.content);
    }
  }, [props, isEditNotice]);

  const makeApprovalRequest = approved =>
    props.editNoticeRequest({
      id: props.notice.id,
      closed: props.notice.closed,
      category: props.notice.category,
      title: props.notice.title,
      content: props.notice.content,
      approved
    });

  const makeNoticeStatusRequest = closed =>
    props.editNoticeRequest({
      id: props.notice.id,
      approved: props.notice.approved,
      category: props.notice.category,
      title: props.notice.title,
      content: props.notice.content,
      closed
    });

  const onApproved = () => makeApprovalRequest(true);
  const onDisapproved = () => makeApprovalRequest(false);
  const handleCategoryChange = category => setCategory(category);
  const handleTitleChange = title => setTitle(title);
  const handleDescriptionChange = content => setDescription(content);

  const handlePublishNotice = () =>
    props.createNoticeRequest({ category, title, content });

  const handleUpdateNotice = () =>
    props.editNoticeRequest({
      id: props.notice.id,
      closed: props.notice.closed,
      approved: props.notice.approved,
      category,
      title,
      content
    });

  const handleNoticeOpen = () => makeNoticeStatusRequest(false);
  const handleNoticeClose = () => makeNoticeStatusRequest(true);
  const handleNoticeDelete = () =>
    props.deleteNoticeRequest({ id: props.notice.id });
  const handleApplicationWindowOpen = () => setIsApplicationOpen(true);
  const handleApplicationWindowClose = () => setIsApplicationOpen(false);

  if (props.categories.length === 0) {
    return null;
  }

  return (
    <BaseNoticeModal
      {...props}
      notice={
        isCreationNotice || isEditNotice
          ? { title, category, content, company: props.companyName }
          : props.notice
      }
      readOnly={isApplicationNotice || isApprovalNotice || props.viewNotice}
      onCategoryChange={handleCategoryChange}
      onTitleChange={handleTitleChange}
      onDescriptionChange={handleDescriptionChange}
    >
      <ApplicationModal
        createApplication={true}
        isOpen={isApplicationOpen}
        onClose={handleApplicationWindowClose}
      />
      {isApplicationNotice && (
        <Button text="Apply" onClick={handleApplicationWindowOpen} />
      )}
      {isApprovalNotice && (
        <Fragment>
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
        </Fragment>
      )}
      {isCreationNotice && (
        <Button text="Publish" onClick={handlePublishNotice} />
      )}
      {isEditNotice && (
        <Fragment>
          <Button
            text="Update"
            onClick={handleUpdateNotice}
            disabled={props.isFetching}
          />
          <Button
            text="Delete"
            onClick={handleNoticeDelete}
            disabled={props.isFetching}
          />
          <Button
            text="Open"
            onClick={handleNoticeOpen}
            disabled={!props.notice.closed || props.isFetching}
          />
          <Button
            text="Close"
            onClick={handleNoticeClose}
            disabled={props.notice.closed || props.isFetching}
          />
        </Fragment>
      )}
    </BaseNoticeModal>
  );
}

NoticeModal.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired
    })
  ).isRequired,
  notice: PropTypes.shape({
    category: PropTypes.string,
    title: PropTypes.string,
    content: PropTypes.string,
    company: PropTypes.string
  }).isRequired,
  userType: PropTypes.string.isRequired,
  companyName: PropTypes.string.isRequired,
  editNoticeRequest: PropTypes.func.isRequired,
  createNoticeRequest: PropTypes.func.isRequired,
  deleteNoticeRequest: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  creationNotice: PropTypes.bool,
  viewNotice: PropTypes.bool
};

NoticeModal.defaultProps = {
  categories: [],
  notice: {}
};

export default NoticeModal;
