import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import BaseNoticeModal from "../BaseNoticeModal";
import Button from "../NoticeModalButton";

function EditNotice(props) {
  const [category, setCategory] = useState(props.notice.category);
  const [title, setTitle] = useState(props.notice.title);
  const [content, setDescription] = useState(props.notice.content);

  useEffect(() => {
    setCategory(props.notice.category);
    setTitle(props.notice.title);
    setDescription(props.notice.content);
  }, [props]);

  const handleCategoryChange = category => setCategory(category);
  const handleTitleChange = title => setTitle(title);
  const handleDescriptionChange = content => setDescription(content);
  const handleUpdateNotice = () =>
    props.editNoticeRequest({
      id: props.notice.id,
      closed: props.notice.closed,
      approved: props.notice.approved,
      category,
      title,
      content
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

  const handleNoticeOpen = () => makeNoticeStatusRequest(false);
  const handleNoticeClose = () => makeNoticeStatusRequest(true);
  const handleNoticeDelete = () =>
    props.deleteNoticeRequest({ id: props.notice.id });

  return (
    <BaseNoticeModal
      readOnly={false}
      onCategoryChange={handleCategoryChange}
      onTitleChange={handleTitleChange}
      onDescriptionChange={handleDescriptionChange}
      notice={{ title, category, content, company: props.notice.company }}
      {...props}
    >
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
    </BaseNoticeModal>
  );
}

EditNotice.propTypes = {
  editNoticeRequest: PropTypes.func.isRequired,
  deleteNoticeRequest: PropTypes.func.isRequired,
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired
    })
  ).isRequired,
  isFetching: PropTypes.bool.isRequired,
  notice: PropTypes.shape({
    category: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    company: PropTypes.string.isRequired,
    closed: PropTypes.bool.isRequired,
    id: PropTypes.any.isRequired
  }).isRequired
};

EditNotice.defaultProps = {
  categories: []
};

export default EditNotice;
