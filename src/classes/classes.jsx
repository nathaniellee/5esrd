import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardHeader,
  CardFooter,
  Divider,
  Subtitle1,
  Text,
  Title1,
  makeStyles,
} from '@fluentui/react-components';
import {
  fetchClasses,
  transformCoreClass,
} from '../api/fetchClasses';
import { classMetadata } from './constants';
import {
  getHitDieString,
  getSavingThrowString,
} from './utils';

const gapSize = 24;

const useStyles = makeStyles({
  card: {
    width: `calc(33.33% - ${gapSize * 2 / 3}px)`,
  },
  container: {
    columnGap: `${gapSize}px`,
    display: 'flex',
    flexWrap: 'wrap',
    marginTop: `${gapSize}px`,
    rowGap: `${gapSize}px`,
  },
  footerDivider: {
    marginBottom: '8px',
  },
  trait: {
    display: 'flex',
    columnGap: '4px',
  },
  traits: {
    flexDirection: 'column',
    flexGrow: 2,
    justifyContent: 'flex-end',
  },
});

const ClassCard = ({
  hitDie,
  id,
  name,
  savingThrows,
}) => {
  const navigate = useNavigate();
  const styles = useStyles();

  const onClickCard = useCallback(() => {
    navigate(`/classes/${id}`);
  }, [id, navigate]);

  const onKeyDownCard = useCallback((evt) => {
    if (evt.key === 'Enter') {
      onClickCard();
    }
  }, [onClickCard]);

  return (
    <Card
      className={styles.card}
      onClick={onClickCard}
      onKeyDown={onKeyDownCard}
    >
      <CardHeader
        header={
          <Subtitle1 weight="semibold">{name}</Subtitle1>
        }
        description={
          <Text italic>{classMetadata[id].tagline}</Text>
        }
      />
      <Text>{classMetadata[id].summary}</Text>
      <CardFooter className={styles.traits}>
        <div>
          <Divider className={styles.footerDivider} />
          <div className={styles.trait}>
            <Text weight="semibold">Hit Point Die:</Text>
            <Text>{getHitDieString(hitDie, name)}</Text>
          </div>
          <div className={styles.trait}>
            <Text weight="semibold">Saving Throws:</Text>
            <Text>{getSavingThrowString(savingThrows)}</Text>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

ClassCard.propTypes = {
  hitDie: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  savingThrows: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export const Classes = () => {
  const [classes, setClasses] = useState([]);
  const styles = useStyles();

  useEffect(() => {
    fetchClasses().then((classes) => {
      setClasses(classes.map(transformCoreClass));
    })
  }, []);

  return (
    <div className="Classes">
      <Title1>Classes</Title1>
      {classes.length > 0 && (
        <div className={styles.container}>
          {classes.map(klass => (
            <ClassCard key={klass.id} {...klass} />
          ))}
        </div>
      )}
    </div>
  );
};
