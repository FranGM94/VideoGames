import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import {PaginationButtonsComponent} from './paginationButtons'

const mockFunction = jest.fn();

it('PaginationButtonComponent should render correctly', () => {
  const component = render(
    <PaginationButtonsComponent
        handleClick={mockFunction} 
        disabledPrev={false}
        disabledNext={false}
     />,
  );
  expect(component).toBeTruthy();
});