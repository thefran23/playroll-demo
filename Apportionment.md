# Salary Apportionment

We want to write a function to figure out how much of an employee's salary they should receive when starting employment part way through a pay cycle. We can call this partial salary the **apportioned salary** for that period.

To work out daily pay, an employee's total _pay cycle salary_ can be split between all possible working days in that pay cycle. Working days are specific to an employee's contract; the function should support part time and full time contracts as long as the working days are consistent week-by-week.

## Example values / definitions

Our implementation should be flexible enough to cover these cases

**Pay Cycle**

A date range, varying depending on the freuency employee is paid; possible frequencies

- Paid Monthly (1st -> Final day of month)
- Paid Weekly (Monday -> Sunday)

**Pay Cycle Salary**

Amount they are paid in total for a full pay cycle

- Any `number`, eg. `1000`
- Relative to cycle
    - If Paid Monthly, `1000` would mean 1000 per month
    - If Paid Weekly, `1000` would mean 1000 per week

**Working Days**

Which days of the week the employee is contracted to work; any set of length between 1 and 7

eg.

- Monday, Tuesday, Wednesday, Thursday, Friday
    - _Example values for a standard UK contract_
- Sunday, Monday, Tuesday, Wednesday, Thursday
    - _Example values for a standard Egyptian contract_
- Tuesday, Thursday, Friday
    - _Example values for a part-time contract_

**Start Date**

The first day the employee will work and earn salary.

eg. `2023-01-04` (4th January)

### Example case

For an employee with the following contract:

- **Pay Cycle**: January 1st 2023 to January 31st 2023
- **Pay Cycle Salary**: 1000
- **Working Days**: Monday, Tuesday, Wednesday, Thursday, Friday
- **Start Date**: January 17th 2023

They should be paid their daily salary for each working day in the range January 17th -> January 31st (inclusive).

The **apportioned salary** should be 500.

If Start Date were _before_ January 1st 2023, **apportioned salary** should be 1000 as they are employed for the whole pay cycle.

If Start Date were _after_ January 31st 2023, **apportioned salary** should be 0 as they are employed for the whole pay cycle.

## Implementation

For the purposes of the exercise, we can assume the code is running server side in the UTC timezone, and the employee / employer are both also located in the UTC timezone (ie. no need to adjust for any other timezone interopability). If you're located in another timezone, you can set the `TZ=UTC` environment variable to force this behaviour in tests / scripts.

We need to implement and unit test a handler with roughly the following signature:

```typescript
/**
 * @param contract the details of specific employee's contract
 * @param payCycleRange the start and end of the pay cycle in which we are calculating apportionment
 * @return total apportioned salary, min: 0, max: full salary defined in `contract` (inclusive)
 */
function apportionSalary(contract: EmploymentContract, payCycleRange: PayCycleRange): number { /* ... */ }
```

In our tests, we should start by covering the example cases [covered earlier](#example-case), and expand our suite to cover other cases that could arise for different contracts and pay cycles. The [example values / definitions](#example-values--definitions) section can help give you some ideas of other cases we need to ensure we've accounted for.

If you come across any edge cases, or make any assumptions due to ambiguity, please leave a _brief_ comment to explain the reasoning used / case complexity.

## Submission

When you're done, please send over the source and test files as a ZIP. A `README.md` can be provided but isn't mandatory - ideally the code should document your high-level reasoning in some way, but anything that you feel isn't covered there can be written in a separate markdown file.

### Stretch goal

During the task we've defined a basic implementation for apportionment, within limited constraints. The real world can be much more complicated!

If you're feeling ambitious, it would be good to think about how we might account for more complex, real world cases. Some examples include employees paid hourly, prorated employment, public holidays, unpaid leave, materity/paternity leave (partial apportioned salary reducing over time), but there are many more!

No need to implement anything code-wise for any of these, but if you can, explain in simple bullet points what would need to change (in input, output, high-level logic etc.) for any of these more complicated cases.
