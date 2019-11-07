import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import classNames from "classnames/bind";

import styles from "./counter.module.scss";
import { inc, dec, rnd, incDelay } from "~src/actions";

const Counter = ({ count, inc, dec, rnd, incDel, delay }) => {
  const bindStyles = classNames.bind(styles);

  const btnClasses = bindStyles("btn");

  return (
    <>
      <h2>{!delay ? count : "Wait"}</h2>
      <div>
        <button
          className={styles.btn}
          onClick={dec}
          disabled={delay}
          type="button"
        >
          dec
        </button>
        <button
          className={styles["btn"]}
          onClick={rnd}
          disabled={delay}
          type="button"
        >
          rnd
        </button>
        <button
          className={btnClasses}
          onClick={inc}
          disabled={delay}
          type="button"
        >
          inc
        </button>
        <button
          className={bindStyles("btn", { "btn--delay": incDel })}
          onClick={incDel}
          disabled={delay}
          type="button"
        >
          delay inc
        </button>
      </div>
    </>
  );
};

Counter.propTypes = {
  count: PropTypes.number.isRequired,
  inc: PropTypes.func.isRequired,
  dec: PropTypes.func.isRequired,
  rnd: PropTypes.func.isRequired,
  incDel: PropTypes.func.isRequired,
  delay: PropTypes.bool.isRequired
};

const mapStateToProps = ({ counter }) => {
  return {
    count: counter.count,
    delay: counter.delay
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ inc, dec, rnd, incDel: incDelay }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Counter);
