import { AuthServiceRequests, AuthServiceRequestsTypes } from '@fullctrl/be-common'
import { Controller } from '@nestjs/common'
import { MessagePattern } from '@nestjs/microservices'

import { DefaultMicroservice } from './default.service'

@Controller()
export class DefaultMicrocontroller {
  constructor (private defaultMicroService: DefaultMicroservice) {}

  @MessagePattern(AuthServiceRequests.authenticate)
  public default (options: AuthServiceRequestsTypes['authenticate']['request']): Promise<AuthServiceRequestsTypes['authenticate']['response']> {
    return this.defaultMicroService.default(options)
  }
}
