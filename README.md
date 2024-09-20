# Francois Rossouw Submission

Thank you for taking the time to review my submission.

# Implementation Notes

Since the brief states that :

> **Pay Cycle**
> A date range, varying depending on the frequency employee is paid; possible frequencies

> - Paid Monthly (1st -> Final day of month)
> - Paid Weekly (Monday -> Sunday)

If a contact states it is "Monthly" a error will be thrown if the pay-cycle does not comply with the above restraint.

If a contact states it is "Weekly" a error will be thrown if the pay-cycle does not comply with the above restraint.

I have tried to be as restrictive as possible with the type definitions for this function, to enforce predictable behavior.

## How to run tests

I have included a suit of unit tests with my submission.

To install dependencies run `npm install`

Tests can be executed by running the command `npm test`
