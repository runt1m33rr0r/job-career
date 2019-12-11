import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import BaseNoticeModal from "../BaseNoticeModal";
import Button from "../NoticeModalButton";
import ApplicationModal from "../../../applications/components/ApplicationModal";
import { userTypes } from "../../../shared/constants";

function NoticeModal(props) {
  const isApprovalNotice = props.userType === userTypes.ADMIN;
  const isCreationNotice =
    props.userType === userTypes.COMPANY && props.creationNotice;
  const isViewNotice =
    props.viewNotice ||
    (props.userType === userTypes.COMPANY &&
      props.notice.company !== props.companyName &&
      !isCreationNotice);
  const isEditNotice =
    props.userType === userTypes.COMPANY &&
    props.notice.company === props.companyName;
  const isApplicationNotice =
    !isViewNotice && props.userType === userTypes.USER;

  const getDefaultCategory = () => {
    if (!isEditNotice && props.categories.length > 0) {
      return props.categories[0].name;
    } else {
      return props.notice.category;
    }
  };

  const [isApplicationOpen, setIsApplicationOpen] = useState(false);
  const [title, setTitle] = useState(
    isCreationNotice ? "" : props.notice.title
  );
  const [category, setCategory] = useState(getDefaultCategory());
  const [content, setDescription] = useState(
    isCreationNotice ? "" : props.notice.content
  );

  useEffect(() => {
    if (isEditNotice) {
      setCategory(props.notice.category);
      setTitle(props.notice.title);
      setDescription(props.notice.content);
    }
  }, [isEditNotice, props]);

  useEffect(() => {
    if (isCreationNotice) {
      setCategory(
        props.categories.length > 0
          ? props.categories[0].name
          : props.notice.category
      );
    }
  }, [props, isCreationNotice]);

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

  if (!category) {
    return null;
  }

  return (
    <BaseNoticeModal
      {...props}
      readOnly={isApplicationNotice || isApprovalNotice || isViewNotice}
      onCategoryChange={handleCategoryChange}
      onTitleChange={handleTitleChange}
      onDescriptionChange={handleDescriptionChange}
      title={title}
      category={category}
      content={content}
      company={props.companyName}
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
