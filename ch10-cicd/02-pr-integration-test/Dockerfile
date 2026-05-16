# syntax=docker/dockerfile:1
FROM alpine
COPY app/test.sh /usr/local/bin/test.sh
RUN chmod +x /usr/local/bin/test.sh
CMD ["/usr/local/bin/test.sh"]
