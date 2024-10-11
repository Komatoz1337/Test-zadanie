import { render, screen, fireEvent } from '@testing-library/react';
import MainPage from '../components/pages/MainPage';
import React from 'react';
import { act } from 'react';

describe('TodoApp', () => {
  test('добавление новой задачи', async () => {
    render(<MainPage />);
    const inputElement = screen.getByPlaceholderText('What needs to be done?');
    fireEvent.change(inputElement, { target: { value: 'new task' } });
    fireEvent.keyPress(inputElement, { key: 'Enter', code: 'Enter' });
    const task = await screen.findByText('new task');
    expect(task).toBeInTheDocument();
  });

  test('переключение фильтров задач', async () => {
    render(<MainPage />);
    const inputElement = screen.getByPlaceholderText('What needs to be done?');
    fireEvent.change(inputElement, { target: { value: 'Активная задача' } });
    fireEvent.keyPress(inputElement, { key: 'Enter', code: 'Enter' });
    fireEvent.change(inputElement, { target: { value: 'Завершённая задача' } });
    fireEvent.keyPress(inputElement, { key: 'Enter', code: 'Enter' });
    const secondTaskCheckbox = await screen.findAllByRole('checkbox');
    fireEvent.click(secondTaskCheckbox[1]);
    fireEvent.click(screen.getByText('Active'));
    expect(screen.queryByText('Завершённая задача')).not.toBeInTheDocument();
    expect(screen.getByText('Активная задача')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Completed'));
    expect(screen.getByText('Завершённая задача')).toBeInTheDocument();
    expect(screen.queryByText('Активная задача')).not.toBeInTheDocument();
  });

  test('очистка завершённых задач', async () => {
    render(<MainPage />);
    const inputElement = screen.getByPlaceholderText('What needs to be done?');
    fireEvent.change(inputElement, { target: { value: 'Завершённая задача' } });
    fireEvent.keyPress(inputElement, { key: 'Enter', code: 'Enter' });
    const checkbox = await screen.findByRole('checkbox');
    fireEvent.click(checkbox);
    fireEvent.click(screen.getByText('Clear completed'));
    expect(screen.queryByText('Завершённая задача')).not.toBeInTheDocument();
  });
});
