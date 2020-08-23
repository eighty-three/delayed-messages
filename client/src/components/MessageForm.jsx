import React from 'react';
import { useForm } from 'react-hook-form';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';

import PropTypes from 'prop-types';

const propTypes = {
  onSubmit: PropTypes.func
};

const MessageForm = ({ onSubmit }) => {
  const { register, handleSubmit } = useForm();

  return (
    <>
      {/* Override form:focus color */}
      <style type="text/css">
        {`
        .form-control:focus {
          border-color: rgba(130, 25, 25, 0.3);
          box-shadow: 0 0 0 0.2rem rgba(130, 25, 25, 0.15);
        }
      `}
      </style>

      <div className="w-75 mx-auto">
        <Form className="mx-auto" onSubmit={handleSubmit(onSubmit)}>
          <Form.Group controlId='formContent'>
            <Form.Label>Message:</Form.Label>
            <Form.Control 
              as="textarea" 
              rows="6"
              type="text"
              maxLength={250}
              placeholder="maxLength={250}"
              spellCheck="false"
              aria-describedby="content"
              name="content"
              ref={register({ required: true })} 
            />
          </Form.Group>
        
          <Form.Row>
            <Form.Group as={Col} controlId='formHours'>
              <Form.Label>Hours</Form.Label>
              <Form.Control
                type="number"
                min="0"
                max="23"
                step="1"
                placeholder="max=23"
                aria-describedby="hours"
                name="hours"
                ref={register({ required: true })} 
              />
            </Form.Group>

            <Form.Group as={Col} controlId='formMinutes'>
              <Form.Label>Minutes</Form.Label>
              <Form.Control
                type="number"
                min="0"
                max="59"
                step="1"
                placeholder="max=59"
                aria-describedby="minutes"
                name="minutes"
                ref={register({ required: true })} 
              />
            </Form.Group>
          </Form.Row>

          <Button variant="dark" type="submit" block>
          Submit Message
          </Button>
        </Form>
      </div>
    </>
  );
};

MessageForm.propTypes = propTypes;

export default MessageForm;
