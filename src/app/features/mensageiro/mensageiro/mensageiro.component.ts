import {ChangeDetectionStrategy, Component} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {NgStyle} from '@angular/common';
import {MatToolbar} from '@angular/material/toolbar';
import {MatIcon} from '@angular/material/icon';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-mensageiro-status',
  imports: [MatCardModule, MatButtonModule, NgStyle, MatToolbar, MatIcon, FormsModule],
  templateUrl: './mensageiro.component.html',
  styleUrl: './mensageiro.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MensageiroComponent {
  text = '';
  status: any = '';

  getTittleCard(): string {
    const labels: { [key: string]: string } = {
      connecting: 'Escaneie o QR Code para conectar o WhatsApp com nosso sistema',
      open: 'Mensageiro conectado e funcionando',
      close: 'Mensageiro desconectado'
    };
    return labels[this.status] || labels['close'];
  }

  getImage(): string {
    const images: { [key: string]: string } = {
      connecting: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Link_pra_pagina_principal_da_Wikipedia-PT_em_codigo_QR_b.svg',
      open: 'assets/circle-check-solid.svg',
      close: 'assets/circle-xmark-solid.svg'
    };
    return images[this.status] || images['close'];
  }

  getButtonLabel(): string {
    const labels: { [key: string]: string } = {
      connecting: 'Atualizar',
      open: 'Desconectar',
      close: 'Conectar'
    };
    return labels[this.status] || labels['close'];
  }

  getButtonStyle(): { [key: string]: string } {
    const styles: { [key: string]: any } = {
      connecting: { 'background-color': 'var(--azul-claro)' },
      open: { 'background-color': 'var(--vermelho)' },
      close: { 'background-color': 'var(--verde)' }
    };
    return styles[this.status] || styles['close'];
  }

  handleButtonClick(): void {
    const actions: { [key: string]: () => void } = {
      connecting: () => this.atualizar(),
      open: () => this.desconectar(),
      close: () => this.conectar()
    };
    (actions[this.status] ?? actions['close'])();
  }

  atualizar() {
    console.log('atualizar')
  }

  desconectar() {
    console.log('desconectar')
  }

  conectar() {
    console.log('conectar')
  }

  enviar() {
    console.log('enviar')
  }

  formatText(format: string) {
    const textarea = document.getElementById('editor') as HTMLTextAreaElement;
    const { selectionStart: start, selectionEnd: end } = textarea;
    const selectedText = this.text.substring(start, end);

    const formats: Record<string, [string, string]> = {
      bold: ['*', '*'],
      italic: ['_', '_'],
    };

    if (formats[format]) {
      const [before, after] = formats[format];
      this.text = this.text.substring(0, start) + before + selectedText + after + this.text.substring(end);
    }

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + (formats[format]?.[0]?.length || 0), start + (formats[format]?.[0]?.length || 0) + selectedText.length);
    });
  }
}
