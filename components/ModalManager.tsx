"use client";

import React, { useState, useEffect } from 'react';
import Modal from './Modal';

const ModalManager = () => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const hasSeenModal = sessionStorage.getItem('hasSeenModal');
    if (!hasSeenModal) {
      setShowModal(true);
      sessionStorage.setItem('hasSeenModal', 'true');
    }
  }, []);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return <Modal show={showModal} onClose={handleCloseModal} />;
};

export default ModalManager;