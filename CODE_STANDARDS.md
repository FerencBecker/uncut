# Code Standards

**Purpose:** Behavioral constraints for AI agents to prevent over-engineering, premature optimization, and unnecessary complexity.

## Core Principles (The Only Basics)

0. **NO COMMENTS! – Name it well, place it well!**
   - Code must be self-explanatory through naming and structure.
   - Comments are a code smell! They always indicate wrong placement, naming, or a violation of SLA.
   - **Exception:** Comments explaining **WHY** (business context, decisions, constraints) are acceptable:
     - Business rules: "VAT calculation per local tax law 2024/XYZ"
     - External constraints: "Polling due to third-party API rate limits"
     - Workarounds: "Temporary fix for upstream bug #1234"
   - **Never comment WHAT or HOW** - that's what code does.

1. **SRP (Single Responsibility Principle)** - THE FOUNDATION
   - Every module, class, or function should have one, and only one, reason to change.
   - Define clear boundaries (contexts) based on who/what triggers changes.
   - Each piece of code should do one thing only.

2. **Context Boundaries**
   - Features/contexts are independent—each owns its concerns end-to-end.
   - Duplication **across contexts** preserves independence (different reasons to change).
   - Only share what truly belongs to a "shared kernel":
     - Domain primitives (UserId, Money, Email types)
     - Core business rules that are truly universal
     - Infrastructure concerns (logging, configuration)
   - Feature cohesion > technical layer cohesion.

3. **DRY (Don't Repeat Yourself) - WITHIN Boundaries Only**
   - Eliminate duplication of **knowledge** within a single context (business rules, domain logic, configuration).
   - **Rule of Three**: Duplicate twice, abstract on third occurrence.
   - Wrong abstraction is worse than duplication—prefer independence over premature coupling.
   - Coincidental similarity across contexts is acceptable—only abstract when things change for the same reason.

4. **KISS (Keep It Simple, Stupid)**
   - Prefer simple, effective solutions within the domain context.
   - Less code is better. Clean and lean is best.

5. **YAGNI (You Aren't Gonna Need It)**
   - Only do what you are named to do, nothing more!
   - Only build what is needed now. Avoid speculative features and abstractions.

6. **SLA (Single Level of Abstraction)**
   - Each function/module should operate at a single, clear level of abstraction.
   - Never mix abstraction levels! Separate into their own expressively named folders, files, or functions.

**All other advice is secondary to these six basics.**

---

## Main Aspect: Lifecycle and Client-Driven Design

- **Lifecycle First:**
  - Always understand the lifecycle of the thing you are naming, placing, or shaping.
  - **Primary:** How does it interact?
  - **Secondary:** When is it created? Who owns it? When does it die?
- **Client Decides:**
  - The client (consumer) defines what is needed.
  - The server (provider) adapts to the client's requirements, not the other way around.
  - APIs, modules, and names are shaped by client needs and lifecycle, not by server convenience.
- **Multiple Clients:**
  - Divergent needs? Extend the response (usually safe) or introduce explicit adapters (when conflicting).
  - All client requirements must be visible in the design—no hidden coupling or "magic."
  - If a module cannot serve all clients cleanly, split it up.

---

## Project Goals (by Priority)

0. **Minimalism**
   - The smallest, leanest solution that works is always preferred.

1. **Simplicity & Understandability = Maintainability**
   - Code should be easy to read, reason about, and modify.

2. **Safety & Security = Transparently Restricted & Logged**
   - All restrictions and security measures must be explicit, visible, and logged.

3. **Performance & Resource Usage**
   - Code should be efficient in both speed and memory, but never at the expense of clarity or safety.

4. **Usability**
   - The system should be easy to use and adapt for its intended clients.

**All design and coding decisions must be guided by these goals, in this order.**

---

## Naming, Placement, and Structure (refined)

- **Naming and structure of data and APIs are driven by the consumer and interactions.**
- **Placement is not driven by the client. Placement expresses the server's own structure and is a server-driven decision.**
- Structure code to match the client's workflow and the lifecycle of the thing, but place it according to the server's logical organization.

---

## Anti-Patterns to Avoid (if they violate the basics)

- **Defensive programming:** NO DEFENSIVE PROGRAMMING! Trust your consumers. If cleanup is needed, document it clearly and make it the consumer's responsibility. No "safety nets" or "just in case" code. The consumer knows their lifecycle better than you do (violates YAGNI, SRP).
  - Real example: Removed defensive useEffect cleanup from usePerformanceMonitoring. Consumer controls lifecycle, not the hook.
  - Result: -7 lines of unnecessary "just in case" code
- **Features for tests only:** If production code never uses a feature, DELETE IT. Tests should verify production behavior, not drive speculative features (violates YAGNI).
  - Real example: usePerformanceMonitoring had `thresholds` and `onAlert` parameters only used in tests, never in App.tsx
  - Result: -30 lines production code, -62 lines test code = **92 lines destroyed**
  - Tests went from 44 to 41, production got simpler, same functionality
- **Overengineering:** Adding complexity for "flexibility" that isn't needed → Start simple, refactor when needed (violates KISS, YAGNI).
- **Wrong data structures:** Using arrays when objects/maps are more appropriate → Use maps/objects for lookups, arrays for sequences (violates KISS).
- **Lists instead of arrays:** Using `List<T>` for read-only data → Prefer arrays for immutable/fixed data, use List only when you need Add/Remove operations (violates KISS, wastes memory).
- **Nullable collections:** Using nullable arrays/lists (e.g., `string[]?`) → Always initialize with empty array/list, never null - avoids null checks everywhere (violates KISS).
- **Excessive filtering/transformation:** Converting efficient structures to inefficient ones → Choose the right structure from the start (violates KISS).
- **Speculative abstractions:** Creating generic solutions for specific problems → Solve the problem at hand, generalize when you have 3+ cases (violates YAGNI).
- **Premature shared abstractions:** Extracting common code across contexts too early → Wait for Rule of Three, prefer duplication across contexts (violates Context Boundaries).
- **Cargo cult optimization (React hooks):** Using `useCallback`/`useMemo`/`memo` without understanding when they're needed → Only use when profiling shows actual performance problems or when preventing expensive re-renders in child components (violates YAGNI, KISS).
  - **When to use `useCallback`:** Only when the function is passed to a memoized child component that would re-render unnecessarily
  - **When to use `useMemo`:** Only for expensive calculations (>5ms) that run on every render
  - **When to use `memo`:** Only for expensive components that re-render frequently with same props
  - **Default:** Use simple arrow functions. They're fast. Premature optimization makes code harder to read.
  - Real example: usePerformanceMonitoring had 6 functions wrapped in `useCallback` with no memoized children, re-renders every second anyway
  - Result: -20 lines of wrapper code, clearer intent, same performance

---

## Error Handling

- **Fail fast and loud**: Don't hide errors, propagate them to where they can be handled properly
- **Validate at boundaries**: Check inputs at API/module entry points, trust internal calls
- **No speculative error handling**: Only catch errors you can actually recover from
- **Log errors with context**: When catching, always log WHY it matters and what was being attempted

## File/Module Organization

- **Split when**: >200 lines, multiple responsibilities, or reused within the same context
- **Keep together when**: Tightly coupled, changed together, small (<100 lines total)
- **One public interface per file**: Internal helpers stay in the same file
- **Duplication across contexts**: Don't split just for reuse across different features—duplicate instead to preserve independence

## External Dependencies

- **Prefer standard library first**: Use built-in features over external packages
- **Only add dependencies for**: Complex domains (auth, crypto, parsing), proven stability, saves >100 lines
- **Never add dependencies for**: Simple utilities, things you can write in <20 lines
- **Each dependency is a liability**: Updates, security, compatibility, bundle size

## Security

- **Never trust input**: Validate and sanitize all external data (user input, APIs, files)
- **Explicit over implicit**: Security decisions must be visible in code—no "magic" authentication
- **Fail secure**: When in doubt, deny access and log the attempt
- **Log security events**: Authentication, authorization failures, suspicious patterns
- **Secrets never in code**: Use environment variables, never hardcode credentials

## Performance

- **Common sense first**: Avoid obvious inefficiencies (O(n²) when O(n) is clear, N+1 queries)
- **No premature optimization**: Profile before optimizing—guesses are usually wrong
- **Clarity over micro-optimizations**: Readable code that's 5% slower is better than clever code
- **Measure, don't assume**: Use profiling tools to find real bottlenecks
- **For small applications**: Common sense and simple algorithms are sufficient

## React Optimization Checklist (Prevent Cargo Cult)

**Before adding `useCallback`, ask:**
1. Is this function passed to a memoized component? (If no → DON'T use `useCallback`)
2. Does the child component re-render unnecessarily? (If no → DON'T use `useCallback`)
3. Is the re-render expensive (>16ms)? (If no → DON'T use `useCallback`)
4. Have you profiled to confirm the problem? (If no → DON'T use `useCallback`)

**Before adding `useMemo`, ask:**
1. Is this calculation expensive (>5ms)? (If no → DON'T use `useMemo`)
2. Does it run on every render? (If no → DON'T use `useMemo`)
3. Have you profiled to confirm the cost? (If no → DON'T use `useMemo`)

**Before adding `memo` to a component, ask:**
1. Does it re-render frequently with the same props? (If no → DON'T use `memo`)
2. Is the render expensive (>16ms)? (If no → DON'T use `memo`)
3. Have you profiled to confirm the problem? (If no → DON'T use `memo`)

**Default approach:**
- Start with simple arrow functions
- Start with regular components
- Only optimize when profiling shows actual performance issues
- Performance issues are real problems with measurements, not theoretical concerns

**Red flags (cargo cult symptoms):**
- "It's a best practice" (without understanding why)
- "We might need it later" (YAGNI violation)
- "All the tutorials do it" (blindly copying patterns)
- "It can't hurt" (adds complexity, hurts readability)

---

**Summary:**

- The only basics: NO COMMENTS (except WHY), SRP, Context Boundaries, DRY (within boundaries), KISS, YAGNI, SLA.
- SRP is the foundation—it drives boundary definition and scoped DRY.
- Context boundaries preserve independence—duplication across contexts is the price of autonomy.
- Always start with lifecycle and client needs.
- Let these principles and goals guide every naming, placement, and structural decision.
