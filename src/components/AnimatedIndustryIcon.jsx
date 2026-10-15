import React from 'react';
import { FlaskIcon } from '../icons/FlaskIcon';
import { WheatIcon } from '../icons/WheatIcon';
import { HospitalIcon } from '../icons/HospitalIcon';
import { StethoscopeIcon } from '../icons/StethoscopeIcon';
import { AirflowIcon } from '../icons/AirflowIcon';

export function AnimatedIndustryIcon({ type, isHovered }) {
  switch (type) {
    case 'flask':
      return <FlaskIcon isHovered={isHovered} />;
    case 'wheat':
      return <WheatIcon isHovered={isHovered} />;
    case 'hospital':
      return <HospitalIcon isHovered={isHovered} />;
    case 'stethoscope':
      return <StethoscopeIcon isHovered={isHovered} />;
    case 'airflow':
      return <AirflowIcon isHovered={isHovered} />;
    default:
      return null;
  }
}
