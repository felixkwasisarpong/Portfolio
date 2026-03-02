import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const DEFAULT_REPOSITORY = "felixkwasisarpong/Portfolio";
const DEFAULT_WORKFLOW_FILE = ".github/workflows/weekly-trends.yml";
const DEFAULT_WORKFLOW_REF = "main";

function isAuthorized(request: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret) return false;
  const authHeader = request.headers.get("authorization");
  return authHeader === `Bearer ${secret}`;
}

async function dispatchWorkflow() {
  const token = process.env.GITHUB_WORKFLOW_TOKEN ?? process.env.GITHUB_TOKEN;
  if (!token) {
    return {
      ok: false,
      status: 500,
      message: "Missing GITHUB_WORKFLOW_TOKEN (or GITHUB_TOKEN).",
    };
  }

  const repository = process.env.GITHUB_REPOSITORY ?? DEFAULT_REPOSITORY;
  const workflowFile = process.env.GITHUB_WORKFLOW_FILE ?? DEFAULT_WORKFLOW_FILE;
  const workflowRef = process.env.GITHUB_WORKFLOW_REF ?? DEFAULT_WORKFLOW_REF;

  const dispatchUrl = `https://api.github.com/repos/${repository}/actions/workflows/${encodeURIComponent(workflowFile)}/dispatches`;
  const response = await fetch(dispatchUrl, {
    method: "POST",
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "User-Agent": "portfolio-vercel-cron",
      "X-GitHub-Api-Version": "2022-11-28",
    },
    body: JSON.stringify({ ref: workflowRef }),
  });

  if (!response.ok) {
    const details = (await response.text()).slice(0, 500);
    return {
      ok: false,
      status: response.status,
      message: `GitHub dispatch failed: ${details || "Unknown error."}`,
    };
  }

  return {
    ok: true,
    status: 202,
    message: "Weekly workflow dispatched successfully.",
    repository,
    workflowFile,
    workflowRef,
  };
}

async function handle(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json(
      { ok: false, message: "Unauthorized. Invalid CRON_SECRET." },
      { status: 401 },
    );
  }

  const result = await dispatchWorkflow();
  if (!result.ok) {
    return NextResponse.json(result, { status: result.status });
  }

  return NextResponse.json(result, { status: 200 });
}

export async function GET(request: Request) {
  return handle(request);
}

export async function POST(request: Request) {
  return handle(request);
}
