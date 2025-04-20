'use client';

import React from 'react'
import { format } from 'date-fns';

function FormatedDate({createdAt}) {
    const formattedDate = format(new Date(createdAt), "yyyy. M. d");

  return (
    <div>{formattedDate}</div>
  )
}

export default FormatedDate