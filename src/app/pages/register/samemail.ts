/* import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { RegistroserviceService } from 'src/app/services/login/registroservice.service';

export function correoExistenteValidator(registroService: RegistroserviceService): ValidatorFn {
    return async (control: AbstractControl): Promise<ValidationErrors | null> => {
        const correoIngresado = control.value;
      
        const correos = await registroService.getUsuarios();
        console.log('Correos existentes:', correos);
    
        const correoExistente = correos.some((usuario) => usuario.correoUsuario === correoIngresado);
        console.log('Correo existente:', correoExistente);

        if (correoExistente) {
            console.log(correoExistente);

            return { correoExistente: true  }; // El correo ya existe
        }
    
        return null; // El correo no existe, no hay error
      };
    } */