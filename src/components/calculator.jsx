import { useState, useEffect } from "react";
import NumberFormat from "react-number-format";

const Calculator = () => {
  const [prevState, setPrevState] = useState("");
  const [curState, setCurState] = useState("");
  const [value, setValue] = useState("0");
  const [operator, setOperator] = useState(null);
  const [result, setResult] = useState(false);

  const valueNum = (e) => {
    if (curState.includes(".") && e.target.innerText === ".") return;

    if (result) {
      setPrevState("");
    }

    curState
      ? setCurState((prev) => prev + e.target.innerText)
      : setCurState(e.target.innerText);
    setResult(false);
  };

  useEffect(() => {
    setValue(curState);
  }, [curState]);

  useEffect(() => {
    setValue("0");
  }, []);
  const operatorType = (e) => {
    setResult(false);
    setOperator(e.target.innerText);
    if (curState === "") return;
    if (prevState !== "") {
      equals();
    } else {
      setPrevState(curState);
      setCurState("");
    }
  };

  const equals = (e) => {
    if (e?.target.innerText === "=") {
      setResult(true);
    }
    let cal;
    switch (operator) {
      case "/":
        cal = String(parseFloat(prevState) / parseFloat(curState));
        break;

      case "+":
        cal = String(parseFloat(prevState) + parseFloat(curState));
        break;
      case "X":
        cal = String(parseFloat(prevState) * parseFloat(curState));
        break;
      case "-":
        cal = String(parseFloat(prevState) - parseFloat(curState));
        break;
      default:
        return;
    }
    setValue("");
    setPrevState(cal);
    setCurState("");
  };

  const minusPlus = () => {
    if (curState.charAt(0) === "-") {
      setCurState(curState.substring(1));
    } else {
      setCurState("-" + curState);
    }
  };

  const percent = () => {
    prevState
      ? setCurState(String((parseFloat(curState) / 100) * prevState))
      : setCurState(String(parseFloat(curState) / 100));
  };

  const reset = () => {
    setPrevState("");
    setCurState("");
    setValue("0");
  };

  return (
    <div className="wrapper">
      <div className="screen">
        {value !== "" || value === "0" ? (
          <NumberFormat
            value={value}
            displayType={"text"}
            thousandSeparator={true}
          />
        ) : (
          <NumberFormat
            value={prevState}
            displayType={"text"}
            thousandSeparator={true}
          />
        )}
      </div>
      <div className="btn light-gray" onClick={reset}>
        AC
      </div>
      <div className="btn light-gray" onClick={percent}>
        %
      </div>
      <div className="btn light-gray" onClick={minusPlus}>
        +/-
      </div>
      <div className="btn pink" onClick={operatorType}>
        /
      </div>
      <div className="btn" onClick={valueNum}>
        7
      </div>
      <div className="btn" onClick={valueNum}>
        8
      </div>
      <div className="btn" onClick={valueNum}>
        9
      </div>
      <div className="btn pink" onClick={operatorType}>
        X
      </div>
      <div className="btn" onClick={valueNum}>
        4
      </div>
      <div className="btn" onClick={valueNum}>
        5
      </div>
      <div className="btn" onClick={valueNum}>
        6
      </div>
      <div className="btn pink" onClick={operatorType}>
        +
      </div>
      <div className="btn" onClick={valueNum}>
        1
      </div>
      <div className="btn" onClick={valueNum}>
        2
      </div>
      <div className="btn" onClick={valueNum}>
        3
      </div>
      <div className="btn pink" onClick={operatorType}>
        -
      </div>
      <div className="btn zero" onClick={valueNum}>
        0
      </div>
      <div className="btn" onClick={valueNum}>
        .
      </div>
      <div className="btn equal" onClick={equals}>
        =
      </div>
    </div>
  );
};

export default Calculator;
