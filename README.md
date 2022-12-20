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

## Customer Portal and Admin Portal

### About SPA

These two portals are both [SPA](https://en.wikipedia.org/wiki/Single-page_application)(Single Page Application). SPA is actually static website but use different approuch other than traditional websites that interacting with the end users. SPA can be hosted on any kind of container like typical http server such as apache httpd, nginx, or cloud host service like AWS s3, etc.

### CheckList

Here is the checklist before deploy the portals. Different choices encourges different results on deployment configuration.

1. Will they be hosted on exclusive domains, such as admin portal on `admin-portal.table-reservation.io` and customer portal on `customer-portal.table-reservation.io`. Or sub path under the shared domain such as admin portal on `table-reservation.io/admin` and customer portal on `table-reservation.io/customer`.
2. Which layer responsibve for the request redirecting. e.g. if the request is target to `/user-profile` page it should be redirected to the `index.html` page. This layer can be a `Nginx` Instance(check this article https://techformist.com/request-redirect-nginx-spa/), AWS cloud front (https://stackoverflow.com/questions/16267339/s3-static-website-hosting-route-all-paths-to-index-html), etc. All depends on your infrastructure.

## Table Reservation Service

Find more on its `readme` doc: [Table Reservation Service](./packages/table-reservation-service/README.md)

# Roadmap

- graphql.
  > I'm considering how to onboard the graphql. https://loopback.io/doc/en/lb4/Using-openapi-to-graphql.html might be the result but still need more investigation.

# LICENSE
