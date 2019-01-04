// @flow

import React from "react"

import { type Column } from "./dataColumns"

export const CamperEmail = () => {
  return (
    <body>
      <p>We&apos;re delighted you have applied to come to M+M Holidays 2019.</p>
      <p>Your application will now be processed.</p>
      <p>
        Confirmation of a place/s will only be sent (via email) from the Booking
        Secretary{" "}
        <strong>once we have received your deposit for the holiday</strong>.
      </p>
      <p>
        Please send your deposit to: El Webster, Booking Secretary, M+M, 18 John
        Morgan Close, Hook, Hants, RG27 9RP
      </p>
      <p>
        Please make cheques payable to &ldquo;M+M Holidays fees account&rdquo;.
      </p>
      <p>To pay by bank transfer, use the following details:</p>
      <p>
        <strong>Who are you paying?</strong> M&M Holidays fees
      </p>
      <p>
        <strong>Your reference:</strong> MM1 or MM2, followed by child&apos;s
        surname and then first name (as much as you can fit in - or initials if
        you are paying for more than one child) For example - MM1 Webster James
        or MM2 Webster J, F & B
      </p>
      <p>
        <strong>Sort code:</strong> 60-13-23
      </p>
      <p>
        <strong>Account number:</strong> 47430702
      </p>
      <p>
        We will continue to send important information via email, particularly
        near the holiday.
      </p>
    </body>
  )
}

export const CampLeaderEmail = ({ columns }: { columns: Array<Column> }) => {
  return (
    <body>
      {columns.map(column => (
        <>
          <p>
            <strong>{column.name}</strong>
            <br />
            {column.value}
          </p>
          <br />
        </>
      ))}
    </body>
  )
}
