# syntax=docker/dockerfile:1
FROM postgres:17-alpine
COPY migrate.sh /usr/local/bin/migrate.sh
RUN chmod +x /usr/local/bin/migrate.sh
ENTRYPOINT ["/usr/local/bin/migrate.sh"]
