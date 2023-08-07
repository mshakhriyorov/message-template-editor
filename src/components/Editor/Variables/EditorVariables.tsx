import React from 'react';
import { useSelector } from 'react-redux';
import { selectorVariableNames } from '../../../app/ui/UiSlice';
import { Button } from '../../Button';

export const EditorVariables = (): JSX.Element => {
  const selectedVariableNames = useSelector(selectorVariableNames);

  return (
    <div className="editor-variables">
      {selectedVariableNames.map(variableName => (
        <Button key={variableName} content={variableName} variant="small" />
      ))}
    </div>
  );
};
