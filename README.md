# hotel-table-reservation

# Getting Started

Please ensure that `Makefile`(optional, it's ok to execute the commands in package.json of each packages manully), `NodeJS v16+` and `Yarn` are available on your machine. Then execute the following commands to bootstrap the project.

Install dependencies.

```bash
make bootstrap
```

Start dev server:

```bash
make dev
```

By default, the reservation service will be started on http://localhost:3000, the admin portal will be on http://localhost:3001, and the customer portal will be on http://localhost:3002. They can be customized by assigning new values to the environment varaibles, check the `dev` target in the [Makefile](./Makefile)

```makefile
dev:
	@echo starting dev server of table-reservation-service, admin-portal and custom portal
	export SERVICE_BASE_URL=http://localhost:3000; \
	export ADMIN_PORTAL_PORT=3001; \
	export CUSTOMER_PORTAL_PORT=3002; \
	lerna run dev
```

More details about the available `job` defined, read [Makefile](./Makefile).

# Build & Docker Build

WIP

# LICENSE
