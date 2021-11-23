import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfigService } from 'src/app/services/config.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  public form: FormGroup
  public name: AbstractControl
  public document: AbstractControl
  public phone: AbstractControl
  public email: AbstractControl
  public salary: AbstractControl
  public gender: AbstractControl
  public birthDate: AbstractControl
  public sub = false
  public employees: any[] = []
  public selectedId = ""

  constructor(
    public datepipe: DatePipe,
    public formBuilder: FormBuilder,
    public config: ConfigService,
    private userService: UserService) {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      document: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.required],
      salary: ['', Validators.required],
      gender: ['', Validators.required],
      birthDate: ['', Validators.required]

    })
    this.name = this.form.controls['name']
    this.document = this.form.controls['document']
    this.phone = this.form.controls['phone']
    this.email = this.form.controls['email']
    this.salary = this.form.controls['salary']
    this.gender = this.form.controls['gender']
    this.birthDate = this.form.controls['birthDate']


  }

  ngOnInit(): void {
    this.list()
  }

  get f() {
    return this.form.controls
  }

  registro() {
    //console.log(this.form.value)
    this.sub = true
    if (this.form.invalid)
      return
    this.add()
  }

  add() {
    console.log(this.selectedId)
    if (this.selectedId) {
      console.log(this.employees)
      this.commitEdit()
    } else {
      this.userService.create(this.form.value).subscribe({
        next: (res: any) => {
          if (res.status) {
            console.log('Usuario registrado')
          }
        },
        complete: () => { this.list() }, // completeHandler
        error: () => { console.log('Error creating user') }    // errorHandler 
      })
      //console.log(this.form.value)
    }
    this.reset()
    this.sub = false
  }

  reset() {
    this.form.reset()
  }

  edit(item: any) {
    console.log(item)
    this.form.get('name')?.setValue(item.name)
    this.form.get('document')?.setValue(item.document)
    this.form.get('phone')?.setValue(item.phone)
    this.form.get('email')?.setValue(item.email)
    this.form.get('salary')?.setValue(item.salary)
    this.form.get('gender')?.setValue(item.gender)
    this.form.get('birthDate')?.setValue(this.datepipe.transform(item.birthDate, 'yyyy-MM-dd'))
    this.selectedId = item._id
  }

  commitEdit() {
    for (let index = 0; index < this.employees.length; index++) {
      if (this.employees[index]._id == this.selectedId) {
        this.userService.update({
          _id: this.selectedId,
          name: this.form.get('name')?.value,
          document: this.form.get('document')?.value,
          phone: this.form.get('phone')?.value,
          email: this.form.get('email')?.value,
          salary: this.form.get('salary')?.value,
          gender: this.form.get('gender')?.value,
          birthDate: this.form.get('birthDate')?.value
        }).subscribe({
          next: (res: any) => {
            if (res.status) {
            }
          },
          complete: () => { this.list() }, // completeHandler
          error: () => { console.log('Error updating user') }    // errorHandler 
        })

      }
    }
    this.selectedId = ""
  }

  delete(_id: string) {
    for (let index = 0; index < this.employees.length; index++) {
      if (this.employees[index]._id == _id) {
        this.userService.delete(_id).subscribe({
          next: (res: any) => {
            if (res.status) {
              this.employees.splice(index, 1)
              console.log('Usuario eliminado')
            }
          },
          complete: () => { this.list() }, // completeHandler
          error: () => { console.log('Error removing user') }    // errorHandler 
        })
      }
    }
  }


  disEnable(item: any) {
    console.log(item)
    for (let index = 0; index < this.employees.length; index++) {
      if (this.employees[index]._id == item._id) {
        this.userService.active({
          _id: item._id,
          status: !item.status
        }).subscribe({
          next: (res: any) => {
            if (res.status) {
              console.log('Usuario actualizado')
            }
          },
          complete: () => { this.employees[index].status = !this.employees[index].status }, // completeHandler
          error: () => { console.log('Error removing user') }    // errorHandler 
        })
      }
    }
  }


  list() {
    this.userService.list().subscribe({
      next: (res: any) => {
        if (res.length > 0) {
          this.employees = res
        }
      },
      complete: () => { console.log('Usuarios listados') }, // completeHandler
      error: () => { console.log('Error to the list user') }    // errorHandler 
    })
  }

  search(event: any) {
    this.userService.search({
      name: event.target.value
    }).subscribe({
      next: (res: any) => {
        console.log(res)
        if (res.length > 0) {
          this.employees = res
        }
      },
      complete: () => { console.log('Empleados listados') }, // completeHandler
      error: () => { console.log('Error al listar los empleados') }    // errorHandler
    })
  }

}
