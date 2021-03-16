import React, { FC } from "react"
import { renderToStaticMarkup } from "react-dom/server"

import { Column } from "./dataColumns"

interface CamperEmailProps {}

const CamperEmail: FC<CamperEmailProps> = () => {
  return (
    <body>
      <p>We&apos;re delighted you have applied to come to M+M Holidays 2021.</p>
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
        <strong>Your reference:</strong> Child&apos;s surname and then first
        name (as much as you can fit in - or initials if you are paying for more
        than one child) For example - Webster James or Webster J, F & B
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

interface CampLeaderEmailProps {
  columns: Array<Column>
}

const CampLeaderEmail: FC<CampLeaderEmailProps> = ({
  columns,
}: CampLeaderEmailProps) => {
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

export const renderCamperEmail = () => renderToStaticMarkup(<CamperEmail />)
export const renderCampLeaderEmail = (columns: Array<Column>) =>
  renderToStaticMarkup(<CampLeaderEmail columns={columns} />)
