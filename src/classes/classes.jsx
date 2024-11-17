import React, { useEffect, useState } from 'react';
import { Title1 } from '@fluentui/react-components';
import {
  fetchClasses,
  transformClasses,
} from '../api/fetchClasses';

export const Classes = () => {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    fetchClasses().then((classes) => {
      setClasses(classes.map(transformClasses));
    })
  }, []);

  return (
    <div className="Classes">
      <Title1>Classes</Title1>
    </div>
  );
};
