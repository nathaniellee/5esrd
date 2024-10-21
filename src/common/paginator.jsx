import PropTypes from 'prop-types';
import React from 'react';
import { Button, makeStyles } from '@fluentui/react-components';

const useStyles = makeStyles({
  root: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: '12px',
    paddingTop: '12px',
  },
});

export const Paginator = ({
  onClickNext,
  onClickPrev,
  pageNumber,
  perPage,
  totalCount,
}) => {
  const styles = useStyles();

  const startIndex = ((pageNumber - 1) * perPage) + 1;
  const endIndex = pageNumber * perPage;
  const countSummary = `Showing ${startIndex}-${endIndex >= totalCount ? totalCount : endIndex} of ${totalCount}`;

  const isPrevDisabled = pageNumber <= 1;
  const isNextDisabled = endIndex >= totalCount;

  return (
    <div className={styles.root}>
      <div>
        {countSummary}
      </div>
      <div>
        <Button
          appearance="transparent"
          disabled={isPrevDisabled}
          onClick={onClickPrev}
        >Prev</Button>
        <Button
          appearance="transparent"
          disabled={isNextDisabled}
          onClick={onClickNext}
        >Next</Button>
      </div>
    </div>
  );
};

Paginator.propTypes = {
  onClickNext: PropTypes.func.isRequired,
  onClickPrev: PropTypes.func.isRequired,
  pageNumber: PropTypes.number.isRequired,
  perPage: PropTypes.number.isRequired,
  totalCount: PropTypes.number.isRequired,
};
