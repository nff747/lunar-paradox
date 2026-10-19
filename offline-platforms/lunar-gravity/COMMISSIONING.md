# Applications and estimate calculator

## Applicant journey

Syzygy → Studio → Start a conversation opens the application, not a calculator.

1. Submit name, email, interest, goal and optional timing/budget.
2. The server stores a pending application and provides an application ID and random private access key. Download the key receipt and keep it private. The tab also retains it for the current browser session where session storage is available.
3. Use Already applied / Check application (`#/estimate`) to see the review decision.
4. Pending and declined applications cannot obtain the rate card or generate estimates.
5. Accepted applications can choose the configured services and quantities, request a server-calculated range, and download the breakdown.

Acceptance is permission to estimate, not acceptance of a contract. Estimates do not book work or collect payments. Scope, availability, external costs and applicable taxes require a written quote. The estimate saves its rate-card revision and original breakdown.

## Owner workflow

Run Start-Syzygy.sh or the other local launcher. Open SCENE → Applications & pricing (`#/applications`). Read `commission-owner.key` from the launcher's `.lunar-data` folder; the terminal also prints its location. Paste it into the owner field. Do not share this key with applicants.

Review each application, select pending / accepted / declined, add an optional applicant-visible note, and save. Acceptance can be revoked; the server then refuses new estimates.

Configure your own services under Estimate rate card: name, unit description, lower price and upper price. Enter normal currency amounts. Choose GBP, USD, EUR or INR. Save before applicants can estimate. The shipped card is empty: no illustrative prices or fictitious offers are included. Removing a service affects new estimates; existing estimate documents retain their historical price breakdown.

Lock review desk clears the owner field and displayed private data. Refreshing also clears the in-memory owner authorisation. Stale pricing saves are rejected rather than overwriting newer changes.

## Storage and delivery boundaries

Applications, decisions, rates and estimates are stored in SQLite alongside existing scene/company records. Access keys are hashed in the database; owner key and database use private filesystem permissions. Applicant credentials are sent in JSON request bodies, never URLs. The server checks approval and reads its own prices; the browser cannot submit a custom price. Owner review and pricing APIs require the owner key.

This edition runs only through the local HTTP launcher. Direct file mode cannot submit applications or issue estimates and says so. There is no automatic email, remote applicant account service, password recovery, payment processing or production hosting configured. A hosted release still needs production identity/session management, delivery, abuse protection and privacy/retention arrangements. Existing publisher and scene development endpoints remain local tools, not a public backend.

Back up the private data folder separately and securely. Distribution ZIPs exclude private data and keys. Preserve the owner key when moving the database. The owner cannot retrieve a lost applicant key from its hash.

## Interaction separation

HOLD TO TRIGGER PARADOX controls the visual fracture only. It no longer navigates after charging and releasing. ENTER independently opens the brand/company introduction.
