export class GitToken {
    token: string; // O token de acesso
    expires_at: string; // Data de expiração do token (ISO 8601)
    permissions?: Record<string, string>; // Permissões concedidas ao token (opcional)
    repository_selection?: string; // "all" ou "selected", indicando quais repositórios o app tem acesso
}