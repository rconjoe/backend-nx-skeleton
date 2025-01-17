import type { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common'
import { Logger } from '@nestjs/common'
import type { Observable } from 'rxjs'
import { finalize } from 'rxjs/operators'

import type { Request } from '@webundsoehne/nestjs-util'
import { getDuration } from '@webundsoehne/nestjs-util'

export class RequestProfilerInterceptor implements NestInterceptor {
  private readonly logger = new Logger(this.constructor.name)

  requestProfilerLog (context: ExecutionContext, method: string, url: string, start: number, end: number): void {
    const httpContext = context.switchToHttp()
    const response: Request = httpContext.getResponse()
    const statusCode = (response as any)?.statusCode ?? response?.raw?.statusCode ?? 'UNDEF'

    this.logger.log(['%s %s finished - %d - took: %d sec', method, url, statusCode, getDuration(start, end).toFixed(3)])
  }

  intercept (context: ExecutionContext, next: CallHandler): Observable<any> {
    const httpContext = context.switchToHttp()
    const request: Request = httpContext.getRequest()

    const url = request.url ?? request.raw.url ?? ''
    const method = String(request.method ?? request.raw.method ?? '').toUpperCase()

    this.logger.log(['%s %s starting...', method, url])

    const start = Date.now()

    return next.handle().pipe(
      // setTimeout to push it on the callstack before an eventual error handler is called.
      // yeah... there are cleaner things. but it's the only way to get the right status code here.
      finalize(() => setTimeout(() => this.requestProfilerLog(context, method, url, start, Date.now()), 0))
    )
  }
}
