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
      props.company !== props.companyName &&
      !isCreationNotice);
  const isEditNotice =
    props.userType === userTypes.COMPANY && props.company === props.companyName;
  const isApplicationNotice =
    !isViewNotice && props.userType === userTypes.USER;

  const getDefaultCategory = () => {
    if (!isEditNotice && props.categories.length > 0) {
      return props.categories[0].name;
    } else {
      return props.category;
    }
  };

  const [isApplicationOpen, setIsApplicationOpen] = useState(false);
  const [title, setTitle] = useState(isCreationNotice ? "" : props.title);
  const [category, setCategory] = useState(getDefaultCategory());
  const [content, setDescription] = useState(
    isCreationNotice ? "" : props.content
  );

  const {
    category: propsCategory,
    title: propsTitle,
    content: propsContent,
    categories
  } = props;

  useEffect(() => {
    if (isEditNotice) {
      setCategory(propsCategory);
      setTitle(propsTitle);
      setDescription(propsContent);
    }
  }, [isEditNotice, propsCategory, propsTitle, propsContent]);

  useEffect(() => {
    if (isCreationNotice) {
      setCategory(categories.length > 0 ? categories[0].name : propsCategory);
    }
  }, [categories, propsCategory, isCreationNotice]);

  const makeApprovalRequest = approved =>
    props.editNoticeRequest({
      id: props.id,
      approved
    });

  const makeNoticeStatusRequest = closed =>
    props.editNoticeRequest({
      id: props.id,
      closed
    });

  const handlePublishNotice = () => {
    props.createNoticeRequest({ category, title, content });
    props.onClose();
  };

  const handleUpdateNotice = () =>
    props.editNoticeRequest({
      id: props.id,
      closed: props.closed,
      approved: props.approved,
      lastModified: props.lastModified,
      category,
      title,
      content
    });

  const handleNoticeDelete = () => {
    props.deleteNoticeRequest({ id: props.id });
    props.onClose();
  };

  const handleNoticeOpen = () => makeNoticeStatusRequest(false);
  const handleNoticeClose = () => makeNoticeStatusRequest(true);
  const handleApplicationWindowOpen = () => setIsApplicationOpen(true);
  const handleApplicationWindowClose = () => setIsApplicationOpen(false);
  const onApproved = () => makeApprovalRequest(true);
  const onDisapproved = () => makeApprovalRequest(false);
  const handleCategoryChange = category => setCategory(category);
  const handleTitleChange = title => setTitle(title);
  const handleDescriptionChange = content => setDescription(content);

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
      company={props.companyName ? props.companyName : props.company}
    >
      {isApplicationNotice && (
        <Fragment>
          <ApplicationModal
            createApplication={true}
            isOpen={isApplicationOpen}
            onClose={handleApplicationWindowClose}
            noticeId={props.id}
          />
          <Button text="Apply" onClick={handleApplicationWindowOpen} />
        </Fragment>
      )}
      {isApprovalNotice && !props.closed && (
        <Fragment>
          <Button
            text="Approve"
            onClick={onApproved}
            disabled={props.isFetching || props.approved}
          />
          <Button
            text="Disapprove"
            onClick={onDisapproved}
            disabled={props.isFetching || !props.approved}
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
            disabled={!props.closed || props.isFetching}
          />
          <Button
            text="Close"
            onClick={handleNoticeClose}
            disabled={props.closed || props.isFetching}
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
  userType: PropTypes.string.isRequired,
  editNoticeRequest: PropTypes.func.isRequired,
  createNoticeRequest: PropTypes.func.isRequired,
  deleteNoticeRequest: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  companyName: PropTypes.string,
  creationNotice: PropTypes.bool,
  viewNotice: PropTypes.bool,
  category: PropTypes.string,
  title: PropTypes.string,
  closed: PropTypes.bool,
  approved: PropTypes.bool,
  content: PropTypes.string,
  company: PropTypes.string,
  id: PropTypes.any
};

NoticeModal.defaultProps = {
  categories: []
};

export default NoticeModal;
