# FlockPilot — Feature Specification v1

**Product:** FlockPilot by Enro Agro Limited
**Category:** Agribusiness ERP & Farm Intelligence Platform
**Focus:** Poultry farm owners and agribusiness operators in Nigeria, expanding across Africa
**Version:** v1
**Trial:** 14-day pilot access available on the Starter plan (1 batch, 2 users)

> FlockPilot gives poultry farmers a real-time operations-and-finance cockpit that tracks flock health,
> feed efficiency, and unit economics in one place — so they can catch losses early and run every batch profitably.

---

## Workforce Management

1. **Employee Directory**
   Keep all staff records in one place, including role, department, contact details, and employment status.
   Module: HR | Audience: Internal/admin only

2. **Employee Lifecycle Updates**
   Support onboarding, profile edits, and offboarding with a clear history of every change.
   Module: HR | Audience: Internal/admin only

3. **Salary Change Tracking**
   Record every salary adjustment with reasons so finance and HR always have a clear trail.
   Module: HR | Audience: Internal/admin only

4. **Department Management**
   Organise teams by department for cleaner reporting and responsibility ownership.
   Module: HR/Admin | Audience: Internal/admin only

---

## Payroll Operations

1. **Payroll Run Management**
   Create payroll periods, process staff pay, and finalise runs with checks in place.
   Module: Payroll | Audience: Internal/admin only

2. **Automated Pay Components**
   Apply recurring allowances, deductions, and loan repayments automatically during payroll processing.
   Module: Payroll | Audience: Internal/admin only

3. **Payment Confirmation**
   Mark who has been paid and attach proof of payment where needed.
   Module: Payroll | Audience: Internal/admin only

4. **Payslip Generation**
   Instantly generate downloadable payslips for each employee.
   Module: Payroll | Audience: Internal/admin only

5. **Payslip Self-Service**
   Employees can view and download their own payslips anytime without contacting HR.
   Module: Self-Service | Audience: Customer-facing

6. **Payslip Email Delivery**
   Send payslips directly to employee email inboxes on payroll completion.
   Module: Payroll | Audience: Internal/admin only | Integration: Resend

---

## Loan Management

1. **Loan Applications**
   Employees can request loans through a guided process with clear terms acknowledgement.
   Module: Loans | Audience: Customer-facing

2. **Eligibility & Risk Scoring**
   Evaluate loan requests using policy rules and repayment risk bands.
   Module: Loans | Audience: Internal/admin only

3. **Approval Workflow**
   Route loan applications to decision-makers for approval or rejection.
   Module: Loans | Audience: Internal/admin only

4. **Repayment Tracking**
   Employees can monitor their loan balance and repayment progress from disbursement to closure.
   Module: Loans | Audience: Customer-facing

5. **Settlement & Default Handling**
   Automatically flag and process overdue or unresolved loan cases.
   Module: Loans/Admin | Audience: Internal/admin only

---

## Finance & Accounting

1. **Expense Entry Workflow**
   Capture and categorise expenses across buckets (Feed, Labor, Vet, Utilities, Transport, Other), submit for review, approve or reject, and track payment status.
   Module: Finance | Audience: Internal/admin only

2. **General Ledger Control**
   Maintain clean double-entry records for reliable books.
   Module: Finance | Audience: Internal/admin only — exclude from marketing

3. **Manual Journal Entries**
   Post controlled manual accounting adjustments when required.
   Module: Finance | Audience: Internal/admin only — exclude from marketing

4. **Chart of Accounts Governance**
   Manage and version account structure over time without losing history.
   Module: Finance | Audience: Internal/admin only — exclude from marketing

5. **Fiscal Period Management**
   Open, close, and reopen financial periods with governance controls.
   Module: Finance | Audience: Internal/admin only — exclude from marketing

6. **Financial Statements**
   Produce trial balance, profit & loss, balance sheet, and cash flow views.
   Module: Finance Reporting | Audience: Internal/admin only

7. **Finance Dashboard**
   Visual snapshot of revenue, costs, cash movement, and overall financial health.
   Module: Finance Analytics | Audience: Internal/admin only

---

## Funding & Capital Tracking

> ⚠️ This entire module is internal founder/operator bookkeeping. Exclude from all marketing and landing page copy.

1. **Funding Event Tracking**
   Record owner/director funding and how funds are allocated.
   Module: Finance/Funding | Audience: Internal/admin only — exclude from marketing

2. **Disbursement Mapping**
   Link funding to payroll, expenses, and other outgoing uses.
   Module: Finance/Funding | Audience: Internal/admin only — exclude from marketing

3. **Reimbursement Workflow**
   Manage reimbursement requests from submission to approval or rejection.
   Module: Finance/Funding | Audience: Internal/admin only — exclude from marketing

---

## Farm Operations

1. **Farm Site Management**
   Manage multiple farm locations under one platform with site-level visibility.
   Module: Farm Ops | Audience: Internal/admin only

2. **Batch Management**
   Track each flock batch from setup through closeout with full lifecycle records.
   Module: Farm Ops | Audience: Internal/admin only

3. **Sales Event Management**
   Create and track farm sales records (bird or kg) with finance review steps.
   Module: Farm Ops/Sales | Audience: Internal/admin only

4. **Feed Inventory**
   Manage feed types, deliveries, and usage records to monitor feed efficiency.
   Module: Farm Inventory | Audience: Internal/admin only

5. **Mortality Tracking**
   Capture mortality events for operational accuracy and early loss detection.
   Module: Farm Ops | Audience: Internal/admin only

6. **Medication Cost Tracking**
   Log medication activities and costs for approval and reporting.
   Module: Farm Ops | Audience: Internal/admin only

7. **Approvals Queues**
   Central queues for finance teams to approve farm-related submissions.
   Module: Farm Ops + Finance | Audience: Internal/admin only

---

## Farm Intelligence (Flight Deck)

1. **Flight Deck — Farm Ops Cockpit**
   Real-time monitoring of flock health, feed performance, sales, and operational alerts in one view.
   Module: Farm Analytics | Audience: Internal/admin only

2. **Batch Profitability Insights**
   See which batches are profitable, compare performance across cycles, and understand the why behind the numbers.
   Module: Farm Analytics | Audience: Internal/admin only

3. **Analytics Export**
   Export farm performance data for deeper analysis and stakeholder reporting.
   Module: Farm Analytics | Audience: Internal/admin only

---

## Documents & Requests

1. **Secure Document Storage**
   Store sensitive files (contracts, IDs, payroll proofs) safely with controlled access.
   Module: Documents | Audience: Internal/admin only | Integration: AWS S3

2. **Employee Document Requests**
   Employees can request official HR documents directly from inside the app.
   Module: Self-Service | Audience: Customer-facing

---

## Notifications & Communication

1. **In-App Notifications**
   Keep users informed about key actions like loan decisions, payroll updates, and farm alerts.
   Module: Notifications | Audience: Customer-facing

2. **Email Notifications**
   Deliver important updates via email when needed.
   Module: Notifications | Audience: Internal/admin only | Integration: Resend

---

## Admin, Security & Governance

1. **Role-Based Access**
   Ensure people only see and do what their role allows — separate Ops and Finance views where applicable.
   Module: Security/Admin | Audience: Internal/admin only

2. **User Administration**
   Create and manage internal user accounts, permissions, and account status.
   Module: Admin | Audience: Internal/admin only

3. **Tenant Configuration**
   Configure organisation-level policy settings, operating rules, and custom thresholds per farm site.
   Module: Admin/Settings | Audience: Internal/admin only

4. **Audit Trail**
   Keep a full history of important actions for accountability and compliance.
   Module: Audit | Audience: Internal/admin only

---

## Employee Self-Service

1. **My Profile**
   Employees can view their own profile details without contacting HR.
   Module: Self-Service | Audience: Customer-facing

2. **My Payslips**
   Employees can access their full payroll history and download payslips anytime.
   Module: Self-Service | Audience: Customer-facing

3. **My Loans**
   Employees can view their own loan applications, approval status, and repayment progress.
   Module: Self-Service | Audience: Customer-facing

4. **Help & Policy Guides**
   Built-in guides explain workflows and policies in plain language — no training needed to get started.
   Module: Documentation | Audience: Customer-facing

---

## Third-Party Integrations

| Service | Purpose                                       |
| ------- | --------------------------------------------- |
| AWS S3  | Secure file storage for sensitive documents   |
| Resend  | Email delivery for payslips and notifications |

---

_FlockPilot is a product of Enro Agro Limited. Lagos, Nigeria._
