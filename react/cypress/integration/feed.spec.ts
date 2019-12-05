import React from 'react';

context('Feed', () => {
  it('Should be able to display the feed', () => {
    cy.visit('/');
    cy.contains('Login').click();
  });
});
