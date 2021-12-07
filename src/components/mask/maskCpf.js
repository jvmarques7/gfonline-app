import * as React from 'react';
import PropTypes from 'prop-types';
import { IMaskInput } from 'react-imask';

export const CpfFormatCustom = React.forwardRef(function CpfFormatCustom(props, ref) {
  const { onChange, ...other } = props;

  return (
    <IMaskInput
        {...other}
        mask="000.000.000-00"
        inputRef={ref}
        onAccept={(value) => onChange({ target: { name: props.name, value } })}
        overwrite
    />
  );
});

CpfFormatCustom.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export const PhoneFormatNumber = React.forwardRef(function PhoneFormatNumber(props, ref) {
    const { onChange, ...other } = props;

    return (
        <IMaskInput
            {...other}
            mask="(00) 00000-0000"
            inputRef={ref}
            onAccept={(value) => onChange({ target: { name: props.name, value } })}
            overwrite
        />
    );
});

PhoneFormatNumber.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

export const TelFormatNumber = React.forwardRef(function TelFormatNumber(props, ref) {
    const { onChange, ...other } = props;

    return (
        <IMaskInput
            {...other}
            mask="(00) 0000-0000"
            inputRef={ref}
            onAccept={(value) => onChange({ target: { name: props.name, value } })}
            overwrite
        />
    );
});

TelFormatNumber.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};