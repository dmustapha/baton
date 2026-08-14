# Baton — Node + Python (the encode/bridge path shells the flare smart-accounts-cli).
FROM node:22-bookworm-slim

# Python + venv for the smart-accounts-cli
RUN apt-get update && apt-get install -y --no-install-recommends python3 python3-venv python3-pip git ca-certificates && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Pin + install the encoding CLI (commit set via build arg from Task-0)
ARG CLI_COMMIT=c8809b94bcda3d0855ca762707f54483a9181e9d
RUN git clone https://github.com/flare-foundation/smart-accounts-cli /smart-accounts-cli \
  && git -C /smart-accounts-cli checkout ${CLI_COMMIT} \
  && python3 -m venv /smart-accounts-cli/venv \
  && /smart-accounts-cli/venv/bin/pip install --no-cache-dir -r /smart-accounts-cli/requirements.txt

# App deps
COPY package.json ./
RUN npm install --no-audit --no-fund
COPY . .
RUN npm run build

ENV NODE_ENV=production
ENV SMART_ACCOUNTS_CLI_DIR=/smart-accounts-cli
ENV CLI_PYTHON=/smart-accounts-cli/venv/bin/python
ENV CLI_ENTRY=smart_accounts.py
EXPOSE 3000
CMD ["npm", "run", "start"]
